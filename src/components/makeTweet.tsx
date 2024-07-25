export default function MakeTweet() {

    const onSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        
    }
    return <>
        <div className="mission-area">
            <form onSubmit={onSubmit}>
                <textarea placeholder="오늘의 의뢰를 적어주세요" />
                <label htmlFor="file">Add photo</label>
                <input type="file" id="file" accept="image/*" />
                <input type="submit" value="post Tweet"></input>
            </form>
        </div>
        
    </>
}