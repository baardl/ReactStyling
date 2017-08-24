
class ProcesessApi {
    // static allProcessesUrl = 'http://localhost:8082/frontend/processes?filter=hei';
    static allProcessesUrl = 'https://dev.shareproc.com/frontend/processes?filter=hei';
    static getAllProcesses() {
        return fetch(this.allProcessesUrl).then(response => {
            return response.json();
        }).catch(error => {
            return error;
        });
    }
}

export default ProcesessApi;