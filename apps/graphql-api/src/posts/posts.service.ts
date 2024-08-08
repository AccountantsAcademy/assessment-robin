import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './posts.model';
import { CreatePostInputDTO } from './post.dto';
import { UserService } from '../users/user.service';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post.name) private postModel: Model<PostDocument>,
    private userService: UserService
  ) {}

  async createPost(postInput: CreatePostInputDTO): Promise<Post> {
    const { title, content, authorId } = postInput;

    const author = await this.userService.findById(authorId);

    if (!author) {
      throw new NotFoundException(`User with ID ${authorId} not found`);
    }

    return new this.postModel({
      title,
      content,
      author,
    }).save();
  }

  async findOne(id: string): Promise<Post> {
    return this.postModel.findById(id).exec();
  }

  async findAll(): Promise<Array<Post>> {
    return this.postModel.find().populate('author').exec();
  }

  async findByEmail(email: string): Promise<Post> {
    return this.postModel.findOne({ email }).exec();
  }
}
