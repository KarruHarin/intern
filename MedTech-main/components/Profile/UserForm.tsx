type User = {
    id: string;
    name: string | null;
    email: string | null;
    emailVerified: boolean | null;
    password: string | null;
    role: string | null;
    image: string | null;
    phone: string | null;
    numberVerified: boolean | null;
};

type UseFormProps = {
    user: User;
};

export default function UseForm({ user }: UseFormProps) {
    return (
        <div>
            <h2>{user.name ?? "No name available"}</h2>
            <p>Email: {user.email ?? "No email available"}</p>
            <p>Phone: {user.phone ?? "No phone available"}</p>
            {/* Add more user details as needed */}
        </div>
    );
}
