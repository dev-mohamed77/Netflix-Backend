import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from './users.service';
import { EndPoint } from 'src/application/config/endpoint';
import {
  ChangePasswordDto,
  CreateUserDto,
  UpdateLoggedUserDto,
  UpdateUserDto,
} from 'src/domain/dto/user.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { RoleGuard } from '../auth/role.guard';
import { Roles } from '../auth/role.decorator';
import { Role } from 'src/application/config/roles';
import { ValidateMongoIdPipe } from 'src/application/pipe/mongo_id_pipe';

@Controller(EndPoint.users)
export class UserController {
  constructor(
    private userService: UserService, // private jwtService: JwtService,
  ) {}

  // ------------------------- Logged User ------------------------

  @Roles(Role.user)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(EndPoint.getMe)
  async getMy(@Req() req) {
    const result = await this.userService.getUserByIDService(req.user.id);
    return {
      status: true,
      result: result,
    };
  }

  @Roles(Role.user)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put(EndPoint.changePasswordLoggedUser)
  async changePasswordLoggedUser(
    @Req() req,
    @Body() changePasswordDto: ChangePasswordDto,
  ) {
    const result = await this.userService.changePasswordLoggedUser(
      req.user.id,
      changePasswordDto.currentPassword,
      changePasswordDto.password,
    );

    return {
      status: true,
      result: result,
    };
  }

  @Roles(Role.user, Role.manager)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put(EndPoint.updateLoggedUser)
  async updateLoggedUserData(
    @Req() req,
    @Body() updateLoggedUserDto: UpdateLoggedUserDto,
  ) {
    const result = await this.userService.updateLoggedUserData(
      req.user.id,
      updateLoggedUserDto.fullName,
      updateLoggedUserDto.phone,
      updateLoggedUserDto.gender,
    );

    return {
      status: true,
      result: result,
    };
  }

  @Roles(Role.user, Role.manager)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(EndPoint.deleteLoggedUser)
  async deleteLoggedUserData(@Req() req) {
    const result = await this.userService.deleteLoggedUserData(req.user.id);

    return {
      status: true,
      result: result,
    };
  }

  // ------------------------- Admin ------------------------

  @Roles(Role.admin, Role.manager)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Post()
  async createUserController(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ) {
    const result = await this.userService.createUserService(createUserDto);

    return {
      status: true,
      result: result,
    };
  }

  @Roles(Role.admin, Role.manager)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get(EndPoint.id)
  async getUserByIDController(@Param('id', ValidateMongoIdPipe) id: string) {
    const user = await this.userService.getUserByIDService(id);
    console.log(user);
    return {
      status: true,
      result: user,
    };
  }

  @Roles(Role.admin, Role.manager)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Get()
  async getUsersController(
    @Param('page') page: string,
    @Param('limit') limit: string,
  ) {
    const users = await this.userService.getUsersService({
      page: parseInt(page),
      limit: parseInt(limit),
    });
    return {
      status: true,
      result: users,
    };
  }

  @Roles(Role.admin, Role.manager)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Put(EndPoint.id)
  async updateUserController(
    @Param('id', ValidateMongoIdPipe) id: string,
    @Body(ValidationPipe) updateUserDto: UpdateUserDto,
  ) {
    console.log(updateUserDto);
    const user = await this.userService.updateUserService(id, updateUserDto);
    return {
      status: true,
      result: user,
    };
  }

  @Roles(Role.admin, Role.manager)
  @UseGuards(JwtAuthGuard, RoleGuard)
  @Delete(EndPoint.id)
  async deleteUserByID(@Param('id', ValidateMongoIdPipe) id: string) {
    const user = await this.userService.deleteUserByIDService(id);
    return {
      status: true,
      result: user,
    };
  }
}
