import { HTTP } from '../util/http'
class LikeModel extends HTTP{
  clickLike(behavior, artID, category) {
    let url = behavior == 'like' ? 'like': 'like/cancel'
    this.request({
      method: 'POST',
      url: url,
      data: {
        art_id: artID,
        type: category
      },
    })
  }
  getClassicLikeStatus(artID,category,sCallBack) {
    this.request({
      url: `classic/${category}/${artID}/favor`,
      success: sCallBack
    })
  }

}

export {
  LikeModel
}