using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Friendly_Corner_backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class SlackController : ControllerBase
    {
        private readonly SlackService _slackService;

        public SlackController(SlackService slackService)
        {
            _slackService = slackService;
        }

        [HttpPost("send")]
        [Authorize]
        public async Task<IActionResult> SendMessage([FromBody] ChatMessage message)
        {
            await _slackService.NotifySlackAsync(message.Text); // Use async method
            return Ok();
        }
    }

    public class ChatMessage
    {
        public required string Text { get; set; }
    }
}