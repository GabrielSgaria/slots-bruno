import { toZonedTime, format } from 'date-fns-tz';
import { revalidateTag, unstable_cache } from 'next/cache';

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
            const resData: CronJobResponse = await res.json();
            const timeZone = resData.jobDetails.schedule.timezone;

            if (typeof resData.jobDetails.lastExecution === 'number' && !isNaN(resData.jobDetails.lastExecution)) {
                resData.jobDetails.lastExecution = formatarHorario(resData.jobDetails.lastExecution, timeZone);
            } else {
                resData.jobDetails.lastExecution = 'N/A';
            }

            revalidateTag(`timeCron`);
            return resData;
        } else {
            console.error('Erro ao buscar cron job:', res.status, res.statusText);
        }
    } catch (err) {
        console.error(`Erro catch ao buscar o job:`, err);
    }
}, ['timeCron'], {
    tags: ['timeCron']
});

function formatarHorario(timestamp: number, timeZone: string): string {
    const zonedDate = toZonedTime(new Date(timestamp * 1000), timeZone);
    const horario = format(zonedDate, 'HH:mm:ss', { timeZone });
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