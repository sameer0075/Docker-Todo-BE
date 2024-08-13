import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm";

export class CreateTasksTable1723104280515 implements MigrationInterface {

    /**
     * This method creates a new table named 'tasks' with the required columns
     * and a foreign key that references the 'users' table.
     *
     * @param {QueryRunner} queryRunner - The query runner to execute database queries.
     * @return {Promise<void>} - A promise that resolves when the table is created.
     */
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Check if the table already exists
        const tableExists = await queryRunner.hasTable('tasks');

        // If the table already exists, drop it
        if (tableExists) {
            await queryRunner.dropTable('tasks');
        }

        // Create a new table named 'tasks' with the required columns
        await queryRunner.createTable(new Table({
            name: 'tasks',
            columns: [
                // 'id' column
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment', // Auto-increment
                },
                // 'title' column
                {
                    name: 'title',
                    type: 'varchar',
                },
                // 'description' column
                {
                    name: 'description',
                    type: 'varchar',
                    default: 'Testing'
                },
                // 'userId' column
                {
                    name: 'userId',
                    type: 'int',
                },
                // 'created_at' column
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()', // Set default value to current timestamp
                },
                // 'updated_at' column
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()', // Set default value to current timestamp
                    onUpdate: 'now()', // Update the value of 'updated_at' to current timestamp on update
                },
            ],
        }));

        // Create a foreign key that references the 'users' table
        await queryRunner.createForeignKey('tasks', new TableForeignKey({
            columnNames: ['userId'], // Column name in 'tasks' table that references 'users' table
            referencedTableName: 'users', // Name of the referenced table
            referencedColumnNames: ['id'], // Column name in the referenced table
            onDelete: 'CASCADE', // Action to perform when a referenced row is deleted
            onUpdate: 'CASCADE', // Action to perform when a referenced row is updated
        }));
    }

    /**
     * Reverts the changes made in the 'up' function.
     * This function is executed when the migration is rolled back.
     *
     * @param {QueryRunner} queryRunner - The query runner object from TypeORM
     * @return {Promise<void>} - A promise that resolves when the function is complete
     */
    public async down(queryRunner: QueryRunner): Promise<void> {
        // Get the table 'tasks' from the query runner
        const table = await queryRunner.getTable('tasks');

        // Find the foreign key that references the 'users' table
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('userId') !== -1);

        // If the foreign key exists, drop it
        if (foreignKey) {
            await queryRunner.dropForeignKey('tasks', foreignKey);
        }

        // Drop the 'tasks' table
        await queryRunner.dropTable('tasks');
    }
}
