import { Field, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@ObjectType()
@Entity()
export class Restaurant {
  @Field(() => Number)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => String)
  @Column()
  @IsString()
  name: string;

  @Field(() => Boolean, { defaultValue: false })
  @Column({ default: false })
  @IsOptional()
  @IsBoolean()
  isVegan: boolean;

  @Field(() => String)
  @Column()
  @IsString()
  address: string;
}
