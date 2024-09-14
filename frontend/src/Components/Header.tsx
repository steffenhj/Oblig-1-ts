

type HeaderProps = {
    student?: string;
    degree?: string;
    points?: number;
}

function Header(props: HeaderProps) {
    const { student, degree, points } = props

    return (
            <>
                <h1>{student}</h1>
                <p>{degree} - {points} studiepoeng</p>
            </>
    )
}

export default Header