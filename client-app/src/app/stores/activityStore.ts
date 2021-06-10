import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";

export default class ActivityStore{
    activities: Activity[] = [];
    SelectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = false;

    constructor(){
       makeAutoObservable(this)
    }

    loadActivities = async () => {
        this.loadingInitial = true;
        try{
            const activities = await agent.Activities.list();
            runInAction(()=>{
                activities.forEach(activity =>{
                    activity.date = activity.date.split('T')[0];
                    this.activities.push(activity);
                  })
                  this.loadingInitial = false; 
            })
        }catch(error){
            console.log(error)
            runInAction(()=>{
                this.loadingInitial = false; 
            })
        }
    }
    selectActivity = (id: string) => {
        this.SelectedActivity = this.activities.find(a=>a.id === id)
    }
    cancelSelectedActivity = () => {
        this.SelectedActivity = undefined;
    }
    openForm = (id?: string) => {
        id ? this.selectActivity(id) : this.cancelSelectedActivity();
        this.editMode = true;
    }
    closeForm = () => {
        this.editMode = false;
    }

}