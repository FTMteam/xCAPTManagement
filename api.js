const api = {}
api.getTHUMBNAIL = async function (id) {
    var url = `https://www.roblox.com/avatar-thumbnails?params=[{userId:${id}}]`
    var res;
  
    try {
      response = await fetch(url)
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
        const data = await response.json();
        
        
         
          url = data[0].thumbnailUrl
          res = url.split("/60/60/AvatarHeadshot/Png/noFilte")[0]
          return(`${res}/420/420/AvatarHeadshot/Png/noFilter`)
       
        
      
    }catch (error) {
      return ('https://tr.rbxcdn.com/30DAY-AvatarHeadshot-310966282D3529E36976BF6B07B1DC90-Png/420/420/AvatarHeadshot/Webp/noFilter')
    }
    
    
  }

  api.test = async function(e) {
    return('hi')
  }
 api.getINFO =  async function(rblx_user) {
    var e = rblx_user;
    var res;
    console.log(e);
  
    try {
      const response = await fetch("https://users.roblox.com/v1/usernames/users", {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "usernames": [
            e
          ],
          "excludeBannedUsers": true
        })
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
  
      const data = await response.json();
      res = data.data[0].id;
      return res;
  
    } catch (error) {
      return 1
    }
  
    
  }
module.exports = api