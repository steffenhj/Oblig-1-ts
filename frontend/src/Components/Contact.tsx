
type ContactProps = {
    email?: string;
}

function Contact( props: ContactProps ) {
    const { email } = props
    return (
        <>
            <p>{email}</p>
        </>
    )
}

export default Contact