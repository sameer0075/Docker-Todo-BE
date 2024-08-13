import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUserTable1723098730457 implements MigrationInterface {

    /**
     * This method creates the 'users' table in the database.
     * It checks if the table already exists and drops it if it does.
     * Then it creates a new table with the specified columns.
     *
     * @param {QueryRunner} queryRunner - The query runner used to manage database operations
     * @return {Promise<void>} Promise that resolves when the table is created
     */
    public async up(queryRunner: QueryRunner): Promise<void> {
        // Check if the 'users' table already exists
        const tableExists = await queryRunner.hasTable('users');

        // If the table exists, drop it
        if (tableExists) {
            await queryRunner.dropTable('users');
        }

        // Create the 'users' table with the specified columns
        await queryRunner.createTable(new Table({
            name: 'users',
            columns: [
                {
                    name: 'id', // Column name
                    type: 'int', // Column data type
                    isPrimary: true, // Is the column the primary key?
                    isGenerated: true, // Is the column auto-incremented?
                    generationStrategy: 'increment', // Auto-increment strategy
                },
                {
                    name: 'name',
                    type: 'varchar',
                },
                {
                    name: 'email',
                    type: 'varchar',
                    isUnique: true, // Is the column unique?
                },
                {
                    name: 'phone',
                    type: 'varchar',
                },
                {
                    name: 'password',
                    type: 'varchar',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()', // Default value for the column
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                    onUpdate: 'now()', // Value to update the column with on update
                },
            ]
        }));
    }

    /**
     * Reverse the migrations.
     *
     * @param {QueryRunner} queryRunner - The query runner to use for the migration.
     * @return {Promise<void>} A promise that resolves when the migration is
     * reversed.
     */
    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop the 'users' table from the database
        await queryRunner.dropTable('users');
    }

}
