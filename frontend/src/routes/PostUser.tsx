import { FormUserComponent } from '../components/FormUserComponent'

export function PostUser() {
    return (
        <div>
            <div className="w-full h-full flex justify-center items-center">
                <FormUserComponent url='http://localhost:5000/api/usuario/' />
            </div>
        </div>
    );
}