import Task from '../models/task.model.js';
export const getTask = async (req,res) => {

  try {
      const tasks = await Task.find({
          user: req.user._id // Buscamos las tareas del usuario actual
      }).populate('user');
      res.json(tasks);
  } catch (error) {
      console.log(error);
      res.status(500).json({error: error.message});
  }
}

export const createTask =async(req,res) => {

    const {title, description, date} = req.body

    try {
        const task = new Task({title, description, date, user: req.user._id});
        const taskSaved = await task.save();
        res.json(taskSaved);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
    }

}

export const getTaskId = async (req, res) => {
    try {
        const { id } = req.params;

        const task = await Task.findById(id).populate('user');
        if (!task) return res.status(404).json({ message: 'Task not found' });
        res.json(task);

    } catch (error) {
        // Para cualquier otro error, respondemos con un error 500.
        return res.status(500).json({ message: 'Something went wrong' });
    }
};


export const updateTask = async(req,res) => {
    const {id} = req.params;
    const {title, description, date} = req.body;
    try {
        const task = await Task.findByIdAndUpdate(id, {title, description, date}, {new: true});
        if(!task) return res.status(404).json({message: 'Task not found'});
        res.json(task );
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
        
    }

}

export const deleteTask = async (req,res) => {
    const {id} = req.params;
    try {
    const task = await Task.findByIdAndDelete(id);
    if(!task) return res.status(404).json({message: 'Task not found'});
    res.json({message: 'Task deleted'});
        
    } catch (error) {
        console.log(error);
        res.status(500).json({error: error.message});
        
    }
}