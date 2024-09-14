import Experience from './Experience'

// type ExperiencesProps = {
//     experience?: string;
//     experience2?: string;
// }

function Experiences({ experienceOne, experienceTwo }: { experienceOne: string, experienceTwo: string }) {

    return (
        <div>
            <Experience description={experienceOne} />
            <Experience description={experienceTwo} />
        </div>
    )
}

export default Experiences