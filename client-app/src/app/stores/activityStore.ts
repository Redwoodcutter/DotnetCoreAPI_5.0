import { makeAutoObservable, runInAction} from "mobx";
import agent from "../api/agent";
import { Activity } from "../models/activity";
import {v4 as uuid } from 'uuid';

export default class ActivityStore{
    activityRegistry = new Map<string, Activity>();
    SelectedActivity: Activity | undefined = undefined;
    editMode = false;
    loading = false;
    loadingInitial = true;

    constructor(){
       makeAutoObservable(this)
    }

    get activitiesByDate(){
        return Array.from(this.activityRegistry.values()).sort((a,b)=> Date.parse(a.date)-Date.parse(b.date));
    }

    loadActivities = async () => {
        this.loadingInitial = true;
        try{
            const activities = await agent.Activities.list();
            runInAction(()=>{
                activities.forEach(activity =>{
                   this.setActivity(activity);
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
    
    loadActivity = async (id : string ) => {
        let activity = this.getActivity(id);
        if(activity){
            this.SelectedActivity = activity;
        }else{
            this.loadingInitial = true;
            try {
                activity = await agent.Activities.details(id);
                this.setActivity(activity);
                this.SelectedActivity = activity;
                this.setLoadingInitial(false);
            } catch (error) {
                console.log(error);
                this.setLoadingInitial(false);
            }
        }
    }
    setLoadingInitial = (state: boolean) => {
        this.loadingInitial = state;
    }
    private getActivity = (id : string ) => {
        return this.activityRegistry.get(id);
    }
    private setActivity = (activity : Activity) => {
        activity.date = activity.date.split('T')[0];
        this.activityRegistry.set(activity.id, activity);
    }


    createActivity  = async (activity : Activity) => {
       this.loading = true;
        activity.id = uuid();
        try{
            await agent.Activities.create(activity);
            runInAction(()=>{
                this.activityRegistry.set(activity.id, activity);
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
                this.activityRegistry.set(activity.id, activity);
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
                this.activityRegistry.delete(id);
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