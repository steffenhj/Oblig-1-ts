import Experience from './Experience'

// type ExperiencesProps = {
//     experience?: string;
//     experience2?: string;
// }

function Experiences({ experiences }: { experiences: string[] }) {

    return (
        <section>
            <h2>Experiences: </h2>
            
            {experiences ? experiences.map((experience, index) => (
                <Experience key={index}>{experience}</Experience>
            )) : (<p>No experiences</p>)
            }

        </section>
    )
}

export default Experiences