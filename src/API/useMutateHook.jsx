import { useMutation } from '@tanstack/react-query';
import { makeRequest } from './REST_METHOD/makeRequest';

const useMutateHook = () => {
 const { mutateAsync, isLoading } = useMutation({
    mutationFn: ({ url, method, data, headers }) => makeRequest({ url, method, data, headers }),
    onSuccess: (data) => {
        console.log("Operation Conducted Successfully", data);
    },
    onError : (error) => {
        console.log("Operation Failed", error);
    }
 })

 return { mutate : mutateAsync, isLoading };
}

export default useMutateHook;