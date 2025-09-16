import { useQuery } from '@tanstack/react-query'
import UseAuth from './UseAuth'
import useAxiosSecure from './useAxiosSecure'

const useUserRole = () => {
	const { user, loading: authLoading } = UseAuth()
	const axiosSecure = useAxiosSecure()
	const {
		data:role = 'user',
		isLoading: roleLoading,
		refetch,
	} = useQuery({
		queryKey: ['userRole', user?.email],
		enabled: !authLoading && !!user?.email, // authloading na thakle r user er modde email thaklei ei api ta colbe
		queryFn: async () => {
			if (user?.email) {
				const res = await axiosSecure.get(`/users/role/${user?.email}`)
				console.log(res)
				return res.data?.role;
			}
		},
	})
	return { role, roleLoading: authLoading || roleLoading, refetch }
}

export default useUserRole;
