import { Op, where } from "sequelize";
import { userModel, users } from "../../DB/model/index.js";

export const profile = async (id) => {
  //   const user = await userModel.findByPk(id,{
  //    // attributes:['firstName','middleName','lastName','email','gender'],
  //     attributes:{
  //     exclude:['password']
  //     }
  //   });

  // const user=await userModel.findOne({
  //     where:{
  //         gender:'female',
  //         id:{[Op.gt]:3}

  //     }
  // }
  // )

  //   const user=await userModel.findAll({
  //   where:{
  //     gende:'female',
  //     id:{[Op.gt]:2}
  //   }
  // })
  // const user=await userModel.findAndCountAll({
  //     where:{
  //         gender:'female',
  //         id :{[Op.gt]:4}
  //     }
  // // })
  // const user=await userModel.findOrCreate({
  //     where:{
  //         firstName:'hoor',

  //     },

  // })
  // const user = await userModel.findOrCreate({
  //   where: { username: 'sdepold' },
  //   defaults: {
  //     job: 'Technical Lead JavaScript',
  //   },
  // });

  const user = await userModel.findAll({
    where: {
      //id:{[Op.eq]:1}
      //id:{[Op.is]:null}
      //   id:{[Op.and]:
      //     [
      //         {
      //             [Op.gte]:2

      //         },
      //         {
      //             [Op.lte]:4
      //         }
      //     ]
      // //   }
      firstName: {
        [Op.like]: "%HO",
      },
    },
  });

  return user;
};

export const updateProfile = async (userId, inputs) => {
  const user = await userModel.update(inputs, {
    where: {
      id: userId,
    },
  });
  return user;
};
export const findingEmail = async (email) => {
  if (!email) {
    throw new Error("Email is not exsist ");
  }
  const user = await userModel.findOne({
    where: { email },
  });
  if (!user) {
    throw new Error("user not found");
  }
  return user;
};

export const exclusion=async(id)=>{
  const user=await userModel.findByPk(id,{
    attributes:{
      exclude:['role']
    }
  })
  if (!user) {
    throw new Error("there is no user with this id");
    
  }
  return user;
}

