class ApplicationController < ActionController::API
  include DeviseTokenAuth::Concerns::SetUserByToken
  before_action :set_json_format

  private
    def set_json_format
      request.format = :json
    end

end
