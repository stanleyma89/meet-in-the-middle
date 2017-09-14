class MapController < ApplicationController

  def index

    response = HTTParty.get("https://api.yelp.com/v3/businesses/search?term=#{params[:term]}&latitude=#{params[:lat]}&longitude=#{params[:lng]}&radius=#{params[:radius]}", headers: {authorization: "Bearer #{ENV["YELP_KEY"]}"})

    body = JSON.parse(response.body)

    respond_to do |format|
      format.html
      format.json do
      render json: body
      end
    end


  end
end
