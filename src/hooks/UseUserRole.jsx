import { useQuery } from '@tanstack/react-query'
import UseAuth from './UseAuth'
import useAxiosInstance from './useAxiosInstance'

const useUserRole = () => {
	const { user, loading: authLoading } = UseAuth()
	const axiosInstance =useAxiosInstance();
	const {
		data:role,
		isLoading: roleLoading,
		refetch,
	} = useQuery({
		queryKey: ['userRole', user?.email],
		enabled: !authLoading && !!user?.email, 
		queryFn: async () => {
			if (user?.email) {
				const res = await axiosInstance.get(`/users/role/${user?.email}`)
				return res.data?.role;
			}
		},
	})
	return { role, roleLoading, refetch }
}

export default useUserRole;
