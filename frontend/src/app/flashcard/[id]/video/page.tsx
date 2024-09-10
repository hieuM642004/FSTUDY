import Video from "./Video";


function PageVideo({params}:{params:{id:string}}) {
    return ( <Video id={params.id} /> );
}

export default PageVideo;