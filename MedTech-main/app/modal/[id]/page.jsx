import { Modal } from "@/components/Profile/Modal";
import UseForm from "@/components/Profile/UserForm";
import { getUserByNumber2 } from "@/data/user";



export default async function NewModal({ params }) {
    const { id } = params;
    const decodedId = decodeURIComponent(id);

    const user = await getUserByNumber2(decodedId);

    // Check if user is valid and handle it accordingly
    if (!user) {
        return <div>User not found</div>;
    }

    return (
        <div>
            <Modal>
                <UseForm user={user} />
            </Modal>
        </div>
    );
}
