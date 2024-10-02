import { Worker } from "../models/worker"

export class WorkerService {
    static rows: Worker[] = [
        { id: '1', title: 'Rodrigo', active: true},
        { id: '2', title: 'Eduardo', active: true },
        { id: '3', title: 'Felipe', active: true },
    ];

    static async getWorkers(): Promise<Worker[]>{
        // simular delay
        return new Promise((resolve) => {
            setTimeout(() => {    
              resolve(this.rows);
              }, 1500);
        })
    }

    static async addWorker(worker: Worker): Promise<boolean>{
        this.rows = [...this.rows, worker];

        // simular delay
        return new Promise((resolve) => {
            setTimeout(() => {    
              resolve(true);
              }, 1500);
        })
    }

    static async deleteWorker(id: string){
        this.rows = this.rows.filter((x) => x.id !== id)
        
        // simular delay
        return new Promise((resolve) => {
            setTimeout(() => {    
              resolve(true);
              }, 1500);
        })
    }
}