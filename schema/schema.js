const graphql = require('graphql');
const _ = require('lodash');
const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList, 
    GraphQLDate } = graphql;

const studentModel = require('../models/student.model');

const StudentType = new GraphQLObjectType({
    name:"student",
    fields: ()=>({
        id:{type:GraphQLID},
        firstName:{type:GraphQLString},
        lastName:{type:GraphQLString},
        email:{type:GraphQLString},
        Phone:{type:GraphQLString},
        address:{type:GraphQLString},
       

    })
})

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        student:{
            type:StudentType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args){
                console.log("args ", args);
                return studentModel.findById(args.id);
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addStudent: {
            type: StudentType,
            args: {
                firstName:{type:GraphQLString},
                lastName:{type:GraphQLString},
                email:{type:GraphQLString},
                Phone:{type:GraphQLString},
                address:{type:GraphQLString},
                
            },
            resolve(parent, args){
                let student = new studentModel({
                    
                    firstName:args.firstName,
                    lastName:args.lastName,
                    email:args.email,
                    Phone:args.Phone,
                    address:args.address,
                    meeting_time:args.meeting_time
                });
                return student.save();
            }
        },
        editStudent:{
            type: StudentType,
            args: {
                id:{type:GraphQLID},
                firstName:{type:GraphQLString},
                lastName:{type:GraphQLString},
                email:{type:GraphQLString},
                Phone:{type:GraphQLString},
                address:{type:GraphQLString},
                
            },
            resolve(parent, args){
                return studentModel.findOneAndUpdate({_id:args.id},{
                    firstName:args.firstName,
                    lastName:args.lastName,
                    email:args.email,
                    Phone:args.Phone,
                    address:args.address,
                    meeting_time:args.meeting_time
                });
            }
        },
        deleteStudent:{
            type: StudentType,
            args: {
                id:{type:GraphQLID},
            },
            resolve(parent, args){
                return studentModel.findOneAndDelete({_id:args.id},{
                    firstName:args.firstName,
                    lastName:args.lastName,
                    email:args.email,
                    Phone:args.Phone,
                    address:args.address,
                    meeting_time:args.meeting_time
                });
            }
        },
        studentsList:{
            type: StudentType,
            args: {
                limit:{type:GraphQLID},
            },
            resolve(parent, args){
                return studentModel.find({
                    firstName:args.firstName,
                    lastName:args.lastName,
                    email:args.email,
                    Phone:args.Phone,
                    address:args.address,
                    meeting_time:args.meeting_time
                }).limit(parseInt(args.limit));
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation: Mutation
});
