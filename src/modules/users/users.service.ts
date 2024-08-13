import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';

import { UserDto, UserResponseDto } from './dto/response.dto';
import { CreateUserRequestDto, LoginUserRequestDto, UpdateUserRequestDto } from './dto/request.dto';
import { BaseService } from 'src/common/services/base.service';
import { User } from 'src/shared/entities/user.entity';
import { comparePassword, generateToken } from 'src/common/helper/utils/helper-functions';

@Injectable()
export class UsersService {
  private userRep: BaseService<User>;

  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {
    this.userRep = new BaseService<User>(
      this.userRepository,
      User.name,
    );
  }

  /**
   * Creates a new user with the given payload.
   * Throws an error if a user with the same email already exists.
   * @param payload - The data for creating a new user.
   * @returns A promise that resolves to a UserResponseDto object containing the created user and a token.
   * @throws HttpException if a user with the same email already exists or if there is an error during the creation process.
   */
  async create(payload: CreateUserRequestDto): Promise<UserResponseDto> {
    try {
      // Check if a user with the same email already exists
      const userExist = await this.userRep.findOne({
        select: ['id', 'name', 'email', 'phone'],
        where: { email: payload.email },
      });

      // Throw an error if a user with the same email already exists
      if (userExist) {
        throw 'User with this email already exists!';
      }

      const body = this.userRepository.create(payload);
      // Save the new user to the database
      const user = await this.userRep.save(body);

      // Generate a token for the new user
      const tokenPayload = {
        id: user.id,
        name: payload.name,
        email: payload.email,
        phone: payload.phone
      }

      const token = generateToken(tokenPayload);
      delete user.password
      // Return the created user and the token in a UserResponseDto object
      return new UserResponseDto(user, token)
    } catch (error) {
      // Throw an HttpException if there was an error during the creation process
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Logs in a user with the given payload.
   * Throws an error if the email or password is invalid.
   * @param payload - The data for logging in the user.
   * @returns A promise that resolves to a UserResponseDto object containing the logged in user and a token.
   * @throws HttpException if the email or password is invalid or if there is an error during the login process.
   */
  async login(payload: LoginUserRequestDto): Promise<UserResponseDto> {
    try {
      // Check if a user with the given email exists
      const userExist = await this.userRep.findOne({
        select: ['id', 'name', 'email', 'phone', 'password'],
        where: { email: payload.email },
      });

      // Throw an error if the email or password is invalid
      if (!userExist) {
        throw 'Invalid email or password!';
      }

      // Compare the provided password with the stored password
      const passwordComparison = await comparePassword(payload.password, userExist.password);

      if (!passwordComparison) {
        throw 'Invalid email or password!';
      }

      // Generate a token for the logged in user
      const tokenPayload = {
        id: userExist.id,
        name: userExist.name,
        email: userExist.email,
        phone: userExist.phone
      }

      const token = generateToken(tokenPayload);
      delete userExist.password
      // Return the logged in user and the token in a UserResponseDto object
      return new UserResponseDto(userExist, token)
    } catch (error) {
      // Throw an HttpException if there was an error during the login process
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Updates a user's information.
   * Throws an error if the user does not exist or if the user is not authorized to update the user.
   * @param user - The user object of the authenticated user.
   * @param payload - The data for updating the user.
   * @returns A promise that resolves to a UserDto object containing the updated user information.
   * @throws HttpException if the user does not exist or if the user is not authorized to update the user.
   */
  async update(user, payload: UpdateUserRequestDto): Promise<UserDto> {
    try {
      // Check if a user with the given id exists
      const userExist = await this.userRep.findOne({
        select: ['id', 'name', 'email', 'phone'],
        where: { id: user.id },
      });

      // Throw an error if the user does not exist
      if (!userExist) {
        throw 'User does not exist!';
      }

      // Throw an error if the user is not authorized to update the user
      if (userExist.email !== payload.email) {
        throw 'You are not authorized to perform this action!';
      }

      // Update the user's information
      const data = await this.userRep.update(user.id, payload);
      return new UserDto(data.id, data.name, data.email, data.phone);
    } catch (error) {
      // Throw an HttpException if there was an error during the update process
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }

  /**
   * Retrieves the profile information of a user.
   *
   * @param {object} user - The user object of the authenticated user.
   * @return {Promise<UserDto>} A promise that resolves to a UserDto object containing the user's profile information.
   * @throws {HttpException} Throws an HttpException if there was an error retrieving the user's profile information.
   */
  async profile(user): Promise<UserDto> {
    try {
      // Retrieve the user's profile information from the database
      const data = await this.userRep.findOne({
        select: ['id', 'name', 'email', 'phone'], // Select only the necessary fields
        where: { id: user.id }, // Filter by the user's ID
      });

      // Throw an error if the user does not exist
      if (!data) {
        throw 'User does not exist!';
      }

      // Return the user's profile information
      return new UserDto(data.id, data.name, data.email, data.phone);
    } catch (error) {
      // Throw an HttpException if there was an error retrieving the user's profile information
      throw new HttpException(error, HttpStatus.BAD_REQUEST);
    }
  }
}
