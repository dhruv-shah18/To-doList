import { useQuery } from "@tanstack/react-query";
import { makeRequest } from "./REST_METHOD/makeRequest";

const useQueryHook = ({ url, headers }) => {
    const result = useQuery({ 
        queryFn: () => makeRequest({ url, headers }),
    })
    return result;
};

export default useQueryHook;
