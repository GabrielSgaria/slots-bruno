import { revalidateTag, unstable_cache } from "next/cache";

const url = process.env.CRON_URL as string;
const token = process.env.CRON_KEY as string;

export const getCronJob = unstable_cache(async () => {
    try {
        const res = await fetch(`${url}`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (res.ok) {
            revalidateTag(`link-casa`);
            const resData = await res.json();


            if (typeof resData.jobDetails.lastExecution === 'number' && !isNaN(resData.jobDetails.lastExecution)) {
                resData.jobDetails.lastExecution = formatarHorario(resData.jobDetails.lastExecution);
            } else {
                resData.jobDetails.lastExecution = 'N/A';
            }


            revalidateTag(`link-casa`);
            return resData;
        } else {
            console.error('Erro ao buscar cron job:', res.status, res.statusText);
        }
    } catch (err) {
        console.error(`Erro catch ao buscar o job:`, err);
    }
}, ['link-casa'], {
    tags: ['link-casa']
})

function formatarHorario(timestamp: number): string {

    const data = new Date(timestamp * 1000);


    const horas = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');
    const segundos = data.getSeconds().toString().padStart(2, '0');

    const horario = `${horas}:${minutos}:${segundos}`;

    return horario;
}


interface CronJobResponse {
    jobDetails: CronJobDetails;
    lastExecution: string;
}

interface CronJobDetails {
    jobId: number;
    enabled: boolean;
    title: string;
    saveResponses: boolean;
    url: string;
    lastStatus: number;
    lastDuration: number;
    lastExecution: number | string;
    nextExecution: number | string;
    auth: {
        enable: boolean;
        user: string;
        password: string;
    };
    notification: {
        onFailure: boolean;
        onSuccess: boolean;
        onDisable: true;
    };
    extendedData: {
        headers: string[];
        body: string;
    };
    type: number;
    requestTimeout: number;
    redirectSuccess: boolean;
    folderId: number;
    schedule: {
        timezone: string;
        expiresAt: number;
        hours: number[];
        mdays: number[];
        minutes: number[];
        months: number[];
        wdays: number[];
    };
    requestMethod: number;
}