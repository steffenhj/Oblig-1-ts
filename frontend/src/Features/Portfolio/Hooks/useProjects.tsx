import { useCallback, useEffect, useState } from 'react';
import ProjectsApi from '../Services/api'

import { Project } from '../Types';

type Status = 'idle' | 'loading' | 'error' | 'success' | 'fetching';

export function useProjects() {
    const [status, setStatus] = useState<Status>('idle');
    const [projects, setProjects] = useState<Project[]>([]);
    const [error, setError] = useState<string | null>(null);

    const isFetching = status === "fetching";
    const isLoading = status === "loading" || isFetching;
    const isError = status === "error" || !!error;
    const isIdle = status === "idle";
    const isSuccess = status === "success";


    const resetToIdle = useCallback(
        (timeout = 2000) =>
          setTimeout(() => {
            setStatus("idle");
          }, timeout),
        []
    );

    const fetchData = useCallback(async () => {
        try {
            setStatus('loading');
            const result = await ProjectsApi.list();
            if (projects === undefined) {console.log('projects is undefined, defaulting to empty array')}
            console.log('useProjects: Response data:', result?.data);
            
            setProjects(result?.data ?? []);
            setStatus('success');
        } catch (error) {
            console.error(error);
            setStatus('error');
            setError('Error fetching projects');
        } finally {
            resetToIdle();
        }
    }, [resetToIdle]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const add = async (data: Partial<Project>) => {
        try {
            setStatus("loading");
            await ProjectsApi.create(data);
            await fetchData();
            setStatus("success");
        } catch (error) {
            console.error(error);
            setStatus("error");
            setError("Error adding project");
        } finally { 
            resetToIdle();
        }
    }

    const remove = async (id: string) => {
        try {
            setStatus("loading")
            await ProjectsApi.remove(id)
            await fetchData()
            setStatus("success")
        } catch (error) {
            console.error(error)
            setStatus("error")
            setError("Error removing project")
        } finally {
            resetToIdle()
        }
    }

    const update = async (id: string, data: Partial<Project>) => {
        try {
            setStatus("loading")
            await ProjectsApi.update(id, data)
            await fetchData()
            setStatus("success")
        } catch (error) {
            console.error(error)
            setStatus("error")
            setError("Error updating project")
        } finally {
            resetToIdle()
        }
    }

    return {
        add,
        remove,
        update,
        get: fetchData,
        projects,
        error,
        setProjects,
        status: {
            idle: isIdle,
            loading: isLoading,
            success: isSuccess,
            error: isError,
            fetching: isFetching
        }
    }

}

export default useProjects;