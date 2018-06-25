using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace CatsIdentity.Controllers
{
  [Authorize]
  [Route("api/[controller]")]
  [ApiController]
  public class TokenController : ControllerBase
  {
    // GET api/token
    [HttpGet]
    public ActionResult<object> Get()
    {
      var expirationDate = DateTime.UtcNow.AddHours(1);

      return new { Token = CreateToken(expirationDate), Expires = expirationDate };
    }

    private string CreateToken(DateTime expirationDate)
    {
      var claims = LookupClaims();

      var userIdentity = new ClaimsIdentity(claims, "Passport");
      var handler = new JwtSecurityTokenHandler();
      var securityToken = handler.CreateToken(new SecurityTokenDescriptor
      {
        Issuer = "https://localhost",
        Audience = "https://localhost",
        SigningCredentials = new SigningCredentials(
              new SymmetricSecurityKey(
                  Encoding.ASCII.GetBytes("this is my key, it is super secret")
              ), SecurityAlgorithms.HmacSha256),
        Subject = userIdentity,
        Expires = expirationDate
      });

      return handler.WriteToken(securityToken);
    }

    private List<Claim> LookupClaims()
    {
      var claims = new List<Claim>()
            {
                new Claim(JwtRegisteredClaimNames.Sub, User.Identity.Name, ClaimValueTypes.String),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString(), ClaimValueTypes.String)
            };

      if (User.Identity.Name.EndsWith("Mark"))
      {
        claims.Add(new Claim("CatsAdmin", "True", ClaimValueTypes.Boolean));
      }
      return claims;
    }
  }
}
