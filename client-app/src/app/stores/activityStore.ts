import {makeObservable, observable} from "mobx";

export default class ActivityStore{
    title = 'Hello from mobX';

    constructor(){
        makeObservable(this, {
            title: observable
        })
    }
}