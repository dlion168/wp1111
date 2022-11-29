// * ////////////////////////////////////////////////////////////////////////
// *
// * FileName     [ info.js ]
// * PackageName  [ server ]
// * Synopsis     [ Get restaurant info from database ]
// * Author       [ Chin-Yi Cheng ]
// * Copyright    [ 2022 11 ]
// *
// * ////////////////////////////////////////////////////////////////////////

import Info from '../models/info'

exports.GetSearch = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const priceFilter = req.query.priceFilter
    const mealFilter  = req.query.mealFilter
    const typeFilter  = req.query.typeFilter
    const sortBy      = req.query.sortBy
    /****************************************/
    const condition ={}
    // // NOTE Hint: 
    await Info.find({condition}).exec((err, data)=>{
        if (err){
            return res.status(403).send({ message: 'error', contents: err })
            }
        else {
            let index = data.length -1
            if ( priceFilter ){
                const pIntFilter = priceFilter.map((ele)=>{
                    return ele.length
                })
                while (index >=0) {
                    if (!(pIntFilter.includes(data[index].price))){
                        data.splice(index,1)
                    }
                    index -= 1
                }
            }
            index = data.length -1
            if ( mealFilter ){
                while (index >=0) {
                    let isInFilter= false
                    for (var j=0; j<data[index].tag.length; j++){
                        if (mealFilter.includes(data[index].tag[j])){
                            isInFilter = true 
                            break
                        }
                    }
                    if (!isInFilter){
                        data.splice(index,1)
                    }
                    index -= 1
                }
            }
            index = data.length -1
            if ( typeFilter ){
                while (index >=0) {
                    for (var j=0; j<data[index].tag.length; j++){
                        if (typeFilter.includes(data[index].tag[j])){
                            index -= 1
                            break
                        }
                    }
                    data.splice(index,1)
                    index -= 1
                }
            }

            if (sortBy == 'price'){
                data = data.sort((p1,p2) => {return p1.price - p2.price})
                
            }
            else if (sortBy == 'distance'){
                data = data.sort((p1,p2) => {return p1.distance - p2.distance})
            }
            console.log(data.length)
            return res.status(200).send({ message: 'success', contents: data })
        }
        }
    )

    // TODO Part I-3-a: find the information to all restaurants
    
    // TODO Part II-2-a: revise the route so that the result is filtered with priceFilter, mealFilter and typeFilter
    // TODO Part II-2-b: revise the route so that the result is sorted by sortBy

}

exports.GetInfo = async (req, res) => {
    /*******    NOTE: DO NOT MODIFY   *******/
    const id = req.query.id
    /****************************************/
    console.log(id)
    // NOTE USE THE FOLLOWING FORMAT. Send type should be 
    // if success:
    // {
    //    message: 'success'
    //    contents: the data to be sent. Hint: A dictionary of the restaruant's information.
    // }
    // else:
    // {
    //    message: 'error'
    //    contents: []
    // }

    // TODO Part III-2: find the information to the restaurant with the id that the user requests
    const condition = {id: id}
    await Info.findOne(condition).exec((err, data)=>{
        if (err){
            return res.status(403).send({ message: 'error', info: [] })}
        else {
            return res.status(200).send({ message: 'success', info: data })}
        }
    )
}