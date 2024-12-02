import MultipleChoiceQuestion from "./MultipleChoice";


function PagePracticeReading({ params }: { params: { id: string } }) {
    return ( <>
        <MultipleChoiceQuestion id={params.id}></MultipleChoiceQuestion>
            
   </>
    )
}

export default PagePracticeReading;