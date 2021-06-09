import {action, makeAutoObservable, makeObservable, observable} from "mobx";

export default class ActivityStore{
    title = 'Hello from mobX';

    constructor(){
       makeAutoObservable(this)
    }

    setTitle = () => {
        this.title = this.title + '!';
    }
}