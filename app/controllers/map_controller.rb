class MapController < ApplicationController

  def index

    access_token = 'dq3yg5i2xGXpNc20jpr9aLkt7VFIyXnIM4srHkgs52DnLL14ZVHEmc4uf03Kzd8iJ3GbeJ-go4A7PsUlCnyEg3EfamrgXuznWaVykxtUCCuXV53GZlQqSsFfIV-oWXYx'

    response = HTTParty.get("https://api.yelp.com/v3/businesses/search?term=#{params[:term]}&latitude=#{params[:lat]}&longitude=#{params[:lng]}&radius=#{params[:radius]}", headers: {authorization: "Bearer #{access_token}"})

    body = JSON.parse(response.body)

    respond_to do |format|
      format.html
      format.json do
      render json: body
      end
    end


  end
end
