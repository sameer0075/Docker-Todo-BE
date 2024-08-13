import { Controller, Get, Post, Body, Res, Put, Req, UseGuards, HttpStatus } from '@nestjs/common';

import { Response } from 'express';

import { UsersService } from './users.service';
import { CreateUserRequestDto, LoginUserRequestDto, UpdateUserRequestDto } from './dto/request.dto';
import PostgreStatusCode from 'src/common/enums/ErrorCodes';
import { UserDto, UserLogout, UserResponseDto } from './dto/response.dto';
import { JwtAuthGuard } from 'src/common/guard/auth.guard';
import { UserEndpoints } from 'src/shared/endpoints';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  /**
   * Create a new user
   * @param {Response} response - The response object
   * @param {CreateUserRequestDto} payload - The payload containing user data
   * @returns {Promise<UserResponseDto>} - The created user data
   */
  @Post(UserEndpoints.createUser())
  async create(
    @Res() response: Response,
    @Body() payload: CreateUserRequestDto,
  ): Promise<UserDto> {
    try {
      // Create a new user using the payload
      const data: UserResponseDto = await this.usersService.create(payload);
      response.setHeader('Authorization', `Bearer ${data.token}`);
      // Send the created user data in the response with a success status code
      response.status(PostgreStatusCode.SuccessCode).send(data.data);

      // Return the created user data
      return data.data;
    } catch (err) {
      // If there is an error, send the error message in the response with an authorization error status code
      response
        .status(PostgreStatusCode.AuthorizationError)
        .send({ error: true, message: err });
    }
  }

  /**
   * Endpoint for user login
   * 
   * This endpoint is used to authenticate a user and obtain a JWT token.
   * 
   * @param {Response} response - The response object
   * @param {LoginUserRequestDto} payload - The payload containing user login credentials
   * @returns {Promise<UserResponseDto>} - The user data and JWT token
   */
  @Post(UserEndpoints.loginUser())
  async login(
    @Res() response: Response,
    @Body() payload: LoginUserRequestDto,
  ): Promise<UserDto> {
    try {
      // Attempt to authenticate the user using the provided credentials
      const data: UserResponseDto = await this.usersService.login(payload);
      response.setHeader('Authorization', `Bearer ${data.token}`);

      // Send the user data and JWT token in the response with a success status code
      response.status(PostgreStatusCode.SuccessCode).send(data.data);

      // Return the user data and JWT token
      return data.data;
    } catch (err) {
      // If there is an error, send the error message in the response with an authorization error status code
      response
        .status(PostgreStatusCode.AuthorizationError)
        .send({ error: true, message: err });
    }
  }

  /**
   * Endpoint for user logout
   *
   * This endpoint is used by a logged-in user to log out. It clears the Authorization
   * header and sends a success message to the client.
   *
   * @param {Response} response - The response object
   * @param {CreateUserRequestDto} payload - The payload containing user login credentials (currently unused)
   * @returns {Promise<UserLogout>} - A success message indicating logout was successful
   */
  @Post(UserEndpoints.logoutUser())
  async logout(
    @Res() response: Response,
    @Body() payload: CreateUserRequestDto,
  ): Promise<UserLogout> {
    try {
      // Clear the Authorization header in the response
      response.setHeader('Authorization', '');

      // Respond to the client with a success message
      response.status(HttpStatus.OK).send({ message: 'Logged out successfully' });

      // Return a success message
      return { message: 'Logged out successfully' }
    } catch (err) {
      // If there is an error, send the error message in the response with an authorization error status code
      response
        .status(PostgreStatusCode.AuthorizationError)
        .send({ error: true, message: err });
    }
  }

  /**
   * Endpoint for updating a user's information
   * 
   * This endpoint is used to update a user's information. The user must be authenticated 
   * (i.e., have a valid JWT token) and provide their own user ID in the request body.
   * 
   * @param {Response} response - The response object
   * @param {Request} request - The request object
   * @param {UpdateUserRequestDto} payload - The payload containing the updated user information
   * @returns {Promise<UserDto>} - The updated user data
   */
  @UseGuards(JwtAuthGuard)
  @Put(UserEndpoints.updateUser())
  async update(
    @Req() request,
    @Res() response: Response,
    @Body() payload: UpdateUserRequestDto,
  ): Promise<UserDto> {
    try {
      // Attempt to update the user's information using the provided payload
      const data: UserDto = await this.usersService.update(request.user, payload);

      // Send the updated user data in the response with a success status code
      response.status(PostgreStatusCode.SuccessCode).send(data);

      // Return the updated user data
      return data;
    } catch (err) {
      // If there is an error, send the error message in the response with an authorization error status code
      response
        .status(PostgreStatusCode.AuthorizationError)
        .send({ error: true, message: err });
    }
  }

  /**
   * Endpoint for retrieving a user's profile information
   * 
   * This endpoint is used to retrieve a user's profile information. The user must be authenticated 
   * (i.e., have a valid JWT token) to access this endpoint.
   * 
   * @param {Response} response - The response object
   * @param {Request} request - The request object
   * @returns {Promise<UserDto>} - The user's profile data
   */
  @UseGuards(JwtAuthGuard)
  @Get(UserEndpoints.getProfile())
  async profile(
    @Req() request,
    @Res() response: Response,
  ): Promise<UserDto> {
    try {
      // Retrieve the user's profile data using the authenticated user's ID
      const data: UserDto = await this.usersService.profile(request.user);

      // Send the user's profile data in the response with a success status code
      response.status(PostgreStatusCode.SuccessCode).send(data);

      // Return the user's profile data
      return data;
    } catch (err) {
      // If there is an error, send the error message in the response with an authorization error status code
      response
        .status(PostgreStatusCode.AuthorizationError)
        .send({ error: true, message: err });
    }
  }
}
