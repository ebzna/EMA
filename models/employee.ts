import { Schema, model, models } from 'mongoose'

const EmployeeSchema = new Schema({
      name: { 
            type: String,
            require: true,
      },
      surname: String, 
      age: Number,
      sex: String,
      certified: Boolean,
      expierence: { 
            type: Number,
            required: true
      },
      occupation: String,
})

const Employee = models.Employee || model("Employee", EmployeeSchema)

export default Employee