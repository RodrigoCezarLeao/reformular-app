import { Worker } from "../models/worker"

export class WorkerService {
    static rows: Worker[] = [
        { id: '1', title: 'Teste 1', active: true},
        { id: '2', title: 'Teste 2', active: true },
    ];

    static delayEffect() {
        let x = 0 
        for(let i=0; i<999999999; i++)
            x = i
        return 
    }
    static async getWorkers(){
        this.delayEffect()
        return Promise.resolve(this.rows)
    }

    static async addWorker(worker: Worker){
        this.delayEffect()
        this.rows = [...this.rows, worker];
        return Promise.resolve(true)
    }

    static async deleteWorker(id: string){
        this.delayEffect()
        this.rows = this.rows.filter((x) => x.id !== id)
        return Promise.resolve(true)
    }
}