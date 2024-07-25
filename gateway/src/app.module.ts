import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { UserModule } from './user/user.module';
import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
class EmptyResolver {
  @Query(() => String)
  async _empty() {
    return 'Hello, GraphQL!';
  }
}

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
    }),
    UserModule,
  ],
  providers: [EmptyResolver],
})
export class AppModule {}
