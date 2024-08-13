import { HttpException, HttpStatus, Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { BaseService } from 'src/common/services/base.service';
import { Task } from 'src/shared/entities/task.entity';
import { TaskResponse } from './dto/response.dto';
import { TaskRequestDto } from './dto/request.dto';

@Injectable()
export class TasksService {
    private tasksRep: BaseService<Task>;

    constructor(
        @InjectRepository(Task)
        private taskRepository: Repository<Task>,
    ) {
        this.tasksRep = new BaseService<Task>(
            this.taskRepository,
            Task.name,
        );
    }

    /**
     * Creates a new task for a user with the given payload.
     * @param user - The user object of the authenticated user.
     * @param payload - The data for creating a new task.
     * @returns A promise that resolves to a TaskResponse object containing the created task.
     * @throws HttpException if there was an error during the creation process.
     */
    async create(user, payload: TaskRequestDto): Promise<TaskResponse> {
        try {
            // Merge the payload with the user ID to create a new task
            const data = await this.tasksRep.save({ ...payload, userId: user.id });
            return new TaskResponse(data.id, data.title);
        } catch (error) {
            // Throw an HttpException if there was an error during the creation process
            Logger.log(error)
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Updates a task with the given ID and payload.
     * 
     * @param id - The ID of the task to update.
     * @param payload - The data to update the task with.
     * @returns A promise that resolves to a TaskResponse object containing the updated task.
     * @throws HttpException with a bad request status if there was an error during the update process.
     */
    async update(id: number, payload: TaskRequestDto): Promise<TaskResponse> {
        try {
            // Call the update method of the tasksRep base service, passing in the ID and payload.
            // The update method will update the task with the given ID and return the updated task.
            const data = await this.tasksRep.update(id, payload);

            // Return the updated task.
            return new TaskResponse(data.id, data.title);
        } catch (error) {
            // If there was an error during the update process, throw an HttpException with a bad request status.
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Retrieves all tasks for a specific user.
     * @param user - The user object of the authenticated user.
     * @returns A promise that resolves to an array of TaskResponse objects containing the user's tasks.
     * @throws HttpException with a bad request status if there was an error retrieving the tasks.
     */
    async findAll(user): Promise<TaskResponse[]> {
        try {
            // Call the findAll method of the tasksRep base service, passing in a filter object to only retrieve tasks for the given user.
            // The findAll method will return an array of TaskResponse objects containing the user's tasks.
            return await this.tasksRep.findAll({
                select: ['id', 'title'],
                where: { userId: user.id },
            })
        } catch (error) {
            // If there was an error during the retrieval process, throw an HttpException with a bad request status.
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Retrieves a specific task for a user.
     *
     * @param id - The ID of the task to retrieve.
     * @param user - The user object of the authenticated user.
     * @returns A promise that resolves to a TaskResponse object containing the task.
     * @throws HttpException with a bad request status if there was an error retrieving the task.
     */
    async findOne(user, id: number): Promise<TaskResponse> {
        try {
            // Retrieve the task from the database, filtering by the user's ID and the task's ID.
            const data = await this.tasksRep.findOne({
                where: { userId: user.id, id },
            });

            if (!data) {
                throw 'Task not found!'
            }

            return new TaskResponse(data.id, data.title);
        } catch (error) {
            // If there was an error during the retrieval process, throw an HttpException with a bad request status.
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Deletes a task for a specific user.
     *
     * @param id - The ID of the task to delete.
     * @param user - The user object of the authenticated user.
     * @returns A promise that resolves to a TaskResponse object containing the deleted task.
     * @throws HttpException with a bad request status if there was an error deleting the task.
     */
    async delete(user, id: number): Promise<TaskResponse> {
        try {
            // Retrieve the deleted task from the database, filtering by the user's ID and the task's ID.
            // This is necessary to return the deleted task to the client.
            const data = await this.tasksRep.findOne({
                where: { userId: user.id, id },
            });

            if (!data) {
                throw 'Task not found!'
            }
            // Delete the task from the database, filtering by the user's ID and the task's ID.
            await this.tasksRep.delete(id);
            return new TaskResponse(data.id, data.title);
        } catch (error) {
            // If there was an error during the deletion process, throw an HttpException with a bad request status.
            throw new HttpException(error, HttpStatus.BAD_REQUEST);
        }
    }
}
