import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import {v4 as uuid } from 'uuid';

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
    createActivity  = async (activity : Activity) => {
       this.loading = true;
        activity.id = uuid();
        try{
            await agent.Activities.create(activity);
            runInAction(()=>{
                this.activities.push(activity);
                this.SelectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        }catch(error){
            console.log(error)
            runInAction(()=>{
                this.loading = false;
            })
        }
    }

    updateActivity = async(activity: Activity)=>{
        this.loading=true;
        try{
            await agent.Activities.update(activity);
            runInAction(()=>{
                this.activities = [...this.activities.filter(a=>a.id !== activity.id),activity];
                this.SelectedActivity = activity;
                this.editMode = false;
                this.loading = false;
            })
        }catch(error){
            console.log(error)
            runInAction(()=>{
                this.loading = false;
            })
        }
    }
    deleteActivity = async (id: string ) => {
        this.loading= true;
        try {
            await agent.Activities.delete(id);
            runInAction(()=>{
                this.activities = [...this.activities.filter(a=>a.id !== id)];
                if(this.SelectedActivity?.id === id) {this.cancelSelectedActivity();}
                this.loading = false;
            })
        } catch (error) {
            console.log(error);
            runInAction(()=>{
                this.loading=false;
            })
        }
    }
}