import { Body, Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';

import { Response } from 'express';

import { TasksService } from './tasks.service';
import { TaskRequestDto } from './dto/request.dto';
import { TaskResponse } from './dto/response.dto';
import PostgreStatusCode from 'src/common/enums/ErrorCodes';
import { TaskEndpoints } from 'src/shared/endpoints';
import { JwtAuthGuard } from 'src/common/guard/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    /**
     * Creates a new task.
     *
     * @param request - The request object containing the authenticated user.
     * @param response - The response object used to send the data back to the client.
     * @param payload - The data containing the task details.
     * @returns A Promise that resolves to a TaskResponse object.
     */
    @Post(TaskEndpoints.createTask())
    async create(@Req() request, @Res() response: Response, @Body() payload: TaskRequestDto): Promise<TaskResponse> {
        try {
            // Call the tasksService to create a new task
            const data: TaskResponse = await this.tasksService.create(request.user, payload);

            // Send a success response to the client with the created task data
            response.status(PostgreStatusCode.SuccessCode).send(data);

            // Return the created task data
            return data;
        } catch (err) {
            // If there is an error, send the error message in the response with an authorization error status code
            response
                .status(PostgreStatusCode.AuthorizationError)
                .send({ error: true, message: err });
        }
    }

    /**
     * Updates a task with the given ID.
     *
     * @param id - The ID of the task to be updated.
     * @param response - The response object used to send the data back to the client.
     * @param payload - The data containing the updated task details.
     * @returns A Promise that resolves to a TaskResponse object.
     */
    @Put(TaskEndpoints.updateTask())
    async update(@Param("id") id: number, @Res() response: Response, @Body() payload: TaskRequestDto): Promise<TaskResponse> {
        try {
            // Call the tasksService to update the task with the given ID
            const data: TaskResponse = await this.tasksService.update(id, payload);

            // Send a success response to the client with the updated task data
            response.status(PostgreStatusCode.SuccessCode).send(data);

            // Return the updated task data
            return data;
        } catch (err) {
            // If there is an error, send the error message in the response with an authorization error status code
            response
                .status(PostgreStatusCode.AuthorizationError)
                .send({ error: true, message: err });
        }
    }

    /**
     * Retrieves all tasks associated with the authenticated user.
     *
     * @param request - The request object containing user information.
     * @param response - The response object used to send the data back to the client.
     * @param payload - The data containing the request details.
     * @returns A Promise that resolves to an array of TaskResponse objects.
     */
    @Get(TaskEndpoints.getTasks())
    async getTasks(@Req() request, @Res() response: Response): Promise<TaskResponse[]> {
        try {
            // Call the tasksService to retrieve all tasks associated with the authenticated user
            const data: TaskResponse[] = await this.tasksService.findAll(request.user);

            // Send a success response to the client with the retrieved tasks
            response.status(PostgreStatusCode.SuccessCode).send(data);

            // Return the retrieved tasks
            return data;
        } catch (err) {
            // If there is an error, send the error message in the response with an authorization error status code
            response
                .status(PostgreStatusCode.AuthorizationError)
                .send({ error: true, message: err });
        }
    }

    /**
     * Retrieves a task associated with the authenticated user.
     *
     * @param id - The ID of the task to retrieve.
     * @param request - The request object containing user information.
     * @param response - The response object used to send the data back to the client.
     * @param payload - The data containing the request details.
     * @returns A Promise that resolves to a TaskResponse object.
     */
    @Get(TaskEndpoints.getTaskById())
    async getTaskById(@Param("id") id: number, @Req() request, @Res() response: Response): Promise<TaskResponse> {
        try {
            // Call the tasksService to retrieve the task with the given ID associated with the authenticated user
            const data: TaskResponse = await this.tasksService.findOne(request.user, id);

            // Send a success response to the client with the retrieved task
            response.status(PostgreStatusCode.SuccessCode).send(data);

            // Return the retrieved task data
            return data;
        } catch (err) {
            // If there is an error, send the error message in the response with an authorization error status code
            response
                .status(PostgreStatusCode.AuthorizationError)
                .send({ error: true, message: err });
        }
    }

    /**
     * Deletes a task associated with the authenticated user.
     *
     * @param id - The ID of the task to delete.
     * @param request - The request object containing user information.
     * @param response - The response object used to send the data back to the client.
     * @param payload - The data containing the request details.
     * @returns A Promise that resolves to a TaskResponse object.
     */
    @Delete(TaskEndpoints.deleteTask())
    async delete(@Param("id") id: number, @Req() request, @Res() response: Response): Promise<TaskResponse> {
        try {
            // Call the tasksService to delete the task with the given ID associated with the authenticated user
            const data: TaskResponse = await this.tasksService.delete(request.user, id);

            // Send a success response to the client with the deleted task
            response.status(PostgreStatusCode.SuccessCode).send(data);

            // Return the deleted task data
            return data;
        } catch (err) {
            // If there is an error, send the error message in the response with an authorization error status code
            response
                .status(PostgreStatusCode.AuthorizationError)
                .send({ error: true, message: err });
        }
    }

}
