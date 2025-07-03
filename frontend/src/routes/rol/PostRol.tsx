import FormRolComponent from "../../components/FormRolComponent"

const PostRol = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <FormRolComponent url={ "http://localhost:5000/api/rol" } />
        </div>
    )
}

export default PostRol
