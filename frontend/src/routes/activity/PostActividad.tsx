import FormActivity from "../../components/activity/FormActivity"

const PostActividad = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <FormActivity url = "http://localhost:5000/api/actividad"/>
            {/* <FormActivity
                url="http://localhost:5000/api/actividad"
                defaultValues = {{title : 'my title',description : 'test description'}}
            /> */}
        </div>
    )
}



export default PostActividad
