const { projects, clients } = require('../sampleData.js')

const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLInt, GraphQLSchema } = require('graphql');
const { type } = require('express/lib/response');

//client Type
const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: () =>({
        id: {type: GraphQLID},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        phone:{type:GraphQLInt},
    })
})

const RootQuery = new GraphQLObjectType({
    name : 'RootQueryType',
    fields: {
        client: {
            type:ClientType,
            args: {id:{type:GraphQLID}},
            resolve(parent,args){
                return clients.find(client => client.id === args.id);
            }
        }
    }
})

module.exports = new GraphQLSchema({
    query:RootQuery
})