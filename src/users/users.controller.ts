import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { ApiKeyGuard } from '../auth/guards/api-key.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { CreatePostDto } from './dto/create-post.dto';

@UseGuards(ApiKeyGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  createUser(@Body() dto: CreateUserDto) {
    return this.usersService.createUser(dto);
  }

  @Get()
  findUsers() {
    return this.usersService.findUsers();
  }

  @Post(':id/posts')
  createPost(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: CreatePostDto,
  ) {
    return this.usersService.createPost(id, dto);
  }

  @Get(':id/posts')
  findUserPosts(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.findUserPosts(id);
  }
}
