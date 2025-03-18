using Friendly_Corner_backend.Models;
using Microsoft.Extensions.Options;
using SlackAPI;

public class SlackService
{
    private readonly string _token;
    private readonly string _channelId;

    public SlackService(IOptions<SlackOptions> options)
    {
        var slackOptions = options.Value;
        _token = slackOptions.Token ?? throw new ArgumentNullException(nameof(slackOptions.Token), "Slack token is not configured.");
        _channelId = slackOptions.ChannelId ?? throw new ArgumentNullException(nameof(slackOptions.ChannelId), "Slack channel ID is not configured.");
    }

    public async Task NotifySlackAsync(string message)
    {
        SlackTaskClient client = new SlackTaskClient(_token);
        var response = await client.PostMessageAsync(_channelId, message);
        if (response.ok)
        {
            Console.WriteLine("Message sent successfully");
        }
        else
        {
            Console.WriteLine("Error sending message: " + response.error);
        }
    }
}