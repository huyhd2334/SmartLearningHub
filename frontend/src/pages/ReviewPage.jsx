import NavigationHome from '@/components/NavigateHomPage'
import ReviewFooter from '@/components/ReviewPageComponents/ReviewFooter.jsx'
import ReviewHeader from '@/components/ReviewPageComponents/ReviewHeader.jsx'
import ReviewMain from '@/components/ReviewPageComponents/ReviewMain.jsx'

const ReviewPage = () => {
  const langue = JSON.parse(localStorage.getItem("langue"))?.langue

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="h-20 flex items-center justify-center border-b bg-white text-black">
        <NavigationHome langue={langue} />
      </div>
      <div className="flex-1 flex flex-col items-center justify-center gap-4">
        <ReviewHeader />
        <ReviewMain />
        <ReviewFooter />
      </div>

    </div>
  )
}

export default ReviewPage
