import UserStore from "./dispatchers/UserStore";
import UsersStore from "./dispatchers/UsersStore";
import PeopleStore from "./dispatchers/PeopleStore";

export default class RootStore {
    constructor() {
        this.userStore = new UserStore(this);  
        this.usersStore = new UsersStore(this)
        this.peopleStore = new PeopleStore(this)
    }
 }