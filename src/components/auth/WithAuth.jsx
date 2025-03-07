import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";

const withAuth = (Component) => {
    return function ProtectedComponent(props) {
        const [loading, setLoading] = useState(true);
        const [user, setUser] = useState(null);
        const router = useRouter();
        const auth = getAuth();

        useEffect(() => {
            const unsubscribe = onAuthStateChanged(auth, (user) => {
                if (!user) {
                    router.push("/login"); // Redirect if not authenticated
                } else {
                    setUser(user);
                }
                setLoading(false);
            });

            return () => unsubscribe();
        }, [auth, router]);

        if (loading) return <p>Loading...</p>; // Prevent flicker

        return user ? <Component {...props} /> : null;
    };
};

export default withAuth;
